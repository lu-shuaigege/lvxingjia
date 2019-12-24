function modeFilter (value){
    if(value === '') {return "";}
    if(value === 1) {return "户外游";}
    if(value === 2) {return "自由行";}
    if(value === 3) {return "摄影游";}
    if(value === 4) {return "亲子游";}
    if(value === 5) {return "跟团游";}
    if(value === 6) {return "周边游";}
    if(value === 7) {return "国内游";}
    if(value === 8) {return "国际游";}
}
function typeFilter (value) {
    if(value === '') {return "";}
    if(value === 1) {return "周边游";}
    if(value === 2) {return "国内游";}
    if(value === 3) {return "国际游";}
}
function cardType (value) {
    if(value === '') {return "";}
    if(value === 1) {return "身份证";}
    if(value === 2) {return "护照";}
}
function sexType (value) {
    if(value === '') {return "";}
    if(value === 0) {return "未知";}
    if(value === 1) {return "男";}
    if(value === 2) {return "女";}
}
// 线路审核状态
function lineStatus (value) {
    if(value === '') {return "";}
    if(value === 0) {return "待审核";}
    if(value === 1) {return "已上架";}
    if(value === 2) {return "已下架";}
    if(value === 3) {return "已驳回";}
    if(value === -1) {return "待发布";}
}
// 收支类型
function exinType (value) {
    if(value === '') {return "";}
    if(value === 1) {return "签到积分";}
    if(value === 2) {return "发布游记";}
    if(value === 3) {return "线路返积分";}
    if(value === 4) {return "兑换";}
    if(value === 5) {return "抵扣";}
}

// 订单详情状态
function orderStatus (value) {
    if(value === '') {return "订单详情";}
    if(value === 0) {return "等待买家付款";}
    if(value === 1) {return "等待买家去出行";}
    if(value === 2) {return "行程已完成";}
    if(value === 3) {return "待退款";}
    if(value === 4) {return "买家取消订单";}
    if(value === 5) {return "买家取消订单";}
}
export {modeFilter,typeFilter,cardType,sexType,lineStatus,exinType,orderStatus}
