const commentShow = document.querySelector('.pop_comment');

const showComments = async (data) => {
  commentShow.innerHTML = '';
  const displayScores = data.map((list) => `<div class="new_list">

    <p> ${list.creation_date} </p>
                                                      
    <p> ${list.username} </p>
                                                      
    <p> ${list.comment} </p>
                                                    
    </div>`).join('');
  commentShow.innerHTML = displayScores;
};

export default showComments;