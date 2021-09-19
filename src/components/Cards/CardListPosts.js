import React from "react";
// components
import ProductDropdown from "components/Dropdowns/ProductDropdown";
import PostDropdown from "components/Dropdowns/PostDropdown";

export default function CardListPosts(props) {
  const { listPosts = [], handleDeletePost } = props;
  return (
    <>
      <div
        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
      >
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  ID
                </th>

                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Tên
                </th>
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Ảnh
                </th>
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Chủ đề
                </th>
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                </th>
              </tr>
            </thead>
            <tbody>
              {
                listPosts.length === 0 && <tr>
                  <td colSpan="4" className="text-center py-4">
                    Không tìm thấy baì viêt nào
                  </td>
                </tr>
              }

              {
                listPosts.map((post) => {
                  return (
                    <tr key={post.id}>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        {post.id}
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        {post.name}
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle">
                        <div className="flex flex-wrap">
                          <img
                            src={post.image}
                            alt={post.name}
                            className="w-10 h-10 rounded-full"
                          ></img>
                        </div>
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        {post.tag_name}
                      </td>
                      <td className="flex justify-end items-center border-t-0 px-3 py-3 mr-8 mt-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-right">
                        <PostDropdown
                          postId={post.id}
                          handleDeletePost={handleDeletePost}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
