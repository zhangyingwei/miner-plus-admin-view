import Ajax from './ajax';

const Request = {
    Dict: {
        get() {
            return Ajax.get(`/dicts`);
        },
    },
    Resources: {
        listNews(params) {
            return Ajax.get("/resources/new",params)
        },
        testRule(param){
            return Ajax.post("/rules/test",param)
        },
        deleteResources(param){
            return Ajax.delete("/resources/"+param)
        },
        publishResources(param){
            return Ajax.post("/rules",param)
        },
        isBad(param){
            return Ajax.post("/resources/bad/"+param)
        },
        isGood(param){
            return Ajax.post("/resources/good/"+param)
        },
        listBads(param){
            return Ajax.get("/resources/bad",param)
        },
        listResources(param){
            return Ajax.get("/resources",param)
        }
    },
    Content: {
        listNews(param){
            return Ajax.get("/contents/news",param)
        },
        readyToPush(param){
            return Ajax.post("/contents/push/"+param.id,param)
        },
        isRubbis(param){
            return Ajax.delete("/contents/review/"+param)
        },
        listPush(param){
            return Ajax.get("/contents/push",param)
        },
        pushOne(param){
            return Ajax.post("/contents/push/",param)
        },
        listTopics(param){
            return Ajax.get("/topics/active",param)
        }
    },
    Tags: {
        listTags(param){
            return Ajax.get("/topics",param)
        },
        addOne(param){
            return Ajax.post("/topics",param)
        },
        deleteOne(param){
            return Ajax.delete("/topics/"+param,param)
        }
    },
    Login: {
        login(param) {
            return Ajax.post("/login", param);
        },
        logout(param) {
            return Ajax.post("/logout", param);
        }
    }
};

module.exports = Request;