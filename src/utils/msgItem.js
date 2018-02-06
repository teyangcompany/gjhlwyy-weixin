export default (res) => {
  let reply = res.msgText || res.replyContent || "";
  if (reply.indexOf('articleId') >= 0 && res.replyContent) {
    reply = JSON.parse(reply);
    return "医生文章：《<a href='#" + '/doc/article/' + reply.articleId + "'>" + reply.title + "</a>》"
  }
  else if (reply.indexOf('articleId') >= 0 && res.msgText) {
    reply = JSON.parse(reply);
    return "医生分享文章：《" + reply.title + "》"
  }
  else {
    return reply;
  }
}
