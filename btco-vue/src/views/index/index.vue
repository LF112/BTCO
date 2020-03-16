<template>
    <article class="indexCo">
        <magnetInfo />
        <overView />
        <thisView />
    </article>
</template>

<script>
import magnetInfo from '@/components/this/index/magnetInfo'
import overView from '@/components/this/index/overView'
import thisView from '@/components/this/index/thisView'
export default {
    components: {
        magnetInfo,
        overView,
        thisView
    }
}
</script>

<style lang="less" scoped>
.indexCo {
    position: relative;
    width: 100%;
}
</style>