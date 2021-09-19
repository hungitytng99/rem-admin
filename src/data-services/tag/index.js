
// Data Flow: Step 2

import { apiDetailTagById } from "data-source/tag";
import { apiListTag } from "data-source/tag";

export const tagService = {
    listTag: function (params) {
        return apiListTag(params).then(response => {
            response.data = response.data.map(tag => {
                return filterFieldTag(tag);
            })
            return response;
        });
    },
    detailTagById: function (params) {
        return apiDetailTagById(params).then(response => {
            return response.data;
        });
    },

}

export const filterFieldTag = (tag) => {
    return {
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        update_at: tag.update_at,
    }
}
