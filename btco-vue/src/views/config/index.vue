<template>
    <div class="configCo">
        <stickySettings />
        <stickySettingOther />
    </div>
</template>

<script>
import stickySettings from '@/components/this/config/stickySettings'
import stickySettingOther from '@/components/this/config/stickySettingOther'
export default {
    components: {
        stickySettings,
        stickySettingOther
    }
}
</script>

<style lang="less" scoped>
.configCo {
    position: relative;
    width: 100%;
}
</style>