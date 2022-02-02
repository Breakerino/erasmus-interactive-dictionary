'use strict';

/**
 *  recipe controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const contentType = { uid: 'term.term' };

const fieldsToPopulate = {
  image: true,
  localizations: true, 
  examples: {
		populate: {
      image: true
    }
  }
};

const queryArgs = {
    // RecentRecipes
    default: ({category, locale}) => ({ 
        where: (category ? {
            category: {
                id: {
                  $eq: category
                }
            }
        } : {}) 
    })
}

const getParsedTermData = async ({id: parentTermID, localizations: childTerms, ...parentTerm}) => {
	const term = {...parentTerm, id: parentTermID, localizations: []};
	
	for ( const {id: childTermID, ...childTermData} of childTerms ) {
		
		const { examples } = await strapi.db.query(`api::${contentType.uid}`).findOne({ where: {id: childTermID}, populate: {examples: {populate: {image: true}}}});
		
		term.localizations.push({
			...childTermData,
			id: childTermID,
			examples: examples?.map((example, exampleIndex) => ({
				...example,
				parentID: parentTerm?.examples?.[exampleIndex]?.id ?? null
			}))
		})
	}
	
	return term;
}

const transformResponse = (data, meta) => ({data, meta})

module.exports = createCoreController(`api::${contentType.uid}`, ({ strapi }) => ({

    async find(ctx) {
        const { query: {type = 'default', ...queryParams} } = ctx;
            
        const entities = await strapi.db.query(`api::${contentType.uid}`).findMany({
            ...(type in queryArgs ? queryArgs[type](queryParams) : {}),
            populate: fieldsToPopulate
        });
        
        let terms = await this.sanitizeOutput(entities, ctx);
				
				// Get examples
				terms = await Promise.all( terms.map(getParsedTermData) );
				
        const entitiesCount = await strapi.db.query(`api::${contentType.uid}`).count({
            ...(type in queryArgs ? queryArgs[type](queryParams) : {}),
            limit: -1,
            offset: null,
            populate: fieldsToPopulate
        });

        return transformResponse(terms, {
          count: entitiesCount,
          category: await strapi.db.query(`api::category.category`).findOne({
            where: {
              id: {
                $eq: queryParams.category
              }
            },
            populate: { localizations: true }
          })
        });
    }

}));