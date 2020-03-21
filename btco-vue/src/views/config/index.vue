<template>
    <div class="configCo">
        <stickySettings />
    </div>
</template>

<script>
import stickySettings from '@/components/this/config/stickySettings'
export default {
    components: {
        stickySettings
    }
}
</script>

<style lang="less" scoped>
.configCo {
    position: relative;
    width: 100%;
}
</style>