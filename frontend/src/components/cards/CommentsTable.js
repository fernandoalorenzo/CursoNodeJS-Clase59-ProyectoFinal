import React from "react";

function CommentsTable({ comments }) {
  return (
    <div>
      <h3>Comentarios</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Contenido</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>{comment.usuario}</td>
              <td>{comment.contenido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommentsTable;