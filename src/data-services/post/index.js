
// Data Flow: Step 2

import { apiListPostByTagId } from "data-source/post";
import { apiDetailPostBySlug } from "data-source/post";
import { apiDeletePost } from "data-source/post";
import { apiUpdatePost } from "data-source/post";
import { apiCreatePost } from "data-source/post";
import { apiListPostByTagSlug } from "data-source/post";
import { apiListPost } from "data-source/post";
import { apiDetailPostById } from "data-source/post";

// transform data to fit with UI;
export const postService = {
    detailPostById: function (id) {
        return apiDetailPostById(id).then(response => {
            response.data = filterFieldPost( response.data);
            return response;
        });
    },
    detailPostBySlug: function (id) {
        return apiDetailPostBySlug(id).then(response => {
            response.data = filterFieldPost( response.data);
            return response;
        });
    },

    

    listPost: function (params) {
        return apiListPost(params).then(response => {
            response.data.postsResult = response.data.postsResult.map(post => {
                return filterFieldPost(post);
            })
            return response;
        });
    },

    listPostByTagId: function (id, params) {
        return apiListPostByTagId(id, params).then(response => {
            response.data = response.data.map(post => {
                return filterFieldPost(post);
            })
            return response;
        });
    },
    listPostByTagSlug: function (slug, params) {
        return apiListPostByTagSlug(slug, params).then(response => {
            response.data = response.data.map(post => {
                return filterFieldPost(post);
            })
            return response;
        });
    },
    addPost: function (params) {
        return apiCreatePost(params).then(response => {
            return response;
        });
    },

    deletePost: function (id) {
        return apiDeletePost(id).then(response => {
            return response;
        });
    },

    updatePost: function(id, params) {
        return apiUpdatePost(id,params).then(response => {
            return response;
        })
    }
}

export const filterFieldPost = (post) => {
    return {
        id: post.id,
        name: post.title,
        image: post.url_image,
        content: post.content,
        tag_id: post.tag_id,
        slug: "/tin-tuc/"+ post.slug,
        update_at: convertDayMonthYear(post.update_at) || '',
    }
}

export const convertDayMonthYear = (dateString) => {
    let date = new Date(dateString);
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();

    return (day + "/" + month + "/" + year);
}
