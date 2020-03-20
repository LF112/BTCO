<template>
    <article class="indexCo">
        <magnetInfo />
        <overView />
        <thisView />
        <networkDiagram />
    </article>
</template>

<script>
import magnetInfo from '@/components/this/index/magnetInfo'
import overView from '@/components/this/index/overView'
import thisView from '@/components/this/index/thisView'
import networkDiagram from '@/components/this/index/networkDiagram'
export default {
    components: {
        magnetInfo,
        overView,
        thisView,
        networkDiagram
    }
}
</script>

<style lang="less" scoped>
.indexCo {
    position: relative;
    width: 100%;
}
</style>