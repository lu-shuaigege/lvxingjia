<template>
    <div class="goout">
        <div class="goout_left" @click="goout()">
            <img src="../../assets/img/home/left.png" class="goout_left_img" alt />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        goout() {
            this.$router.go(-1);
        }
    }
};
</script>

<style >
.goout {
    width: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 1000;
}
.goout_left {
    width: 100%;
    height: 0.8rem;
    padding: 0rem 0.4rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
}
.goout_left_img {
    height: 0.5rem;
}
</style>
