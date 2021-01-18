<template>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.loading{
    width: 80px;
    height: 40px;
    margin: 0 auto;
    margin-top:100px;
    display: flex;
    justify-content: space-between;
}
.loading span{
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: rgb(224, 21, 99);
    -webkit-animation: load 1s ease infinite;
}
@-webkit-keyframes load{
    0%,100%{
        height: 40px;
        background:  rgb(155, 7, 64);
    }
    50%{
        height: 70px;
        margin: -15px 0;
        background: rgba(241, 14, 14, 0.521);
    }
}
.loading span:nth-child(2){
    -webkit-animation-delay:0.2s;
}
.loading span:nth-child(3){
    -webkit-animation-delay:0.4s;
}
.loading span:nth-child(4){
    -webkit-animation-delay:0.6s;
}
.loading span:nth-child(5){
    -webkit-animation-delay:0.8s;
}
</style>
