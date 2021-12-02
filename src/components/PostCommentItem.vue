<template>
  <div>
      <!--comment-->
        <div class="ass1-comments__section">
            <a href="#" class="ass1-comments__avatar ass1-avatar"><img src="/dist/images/avatar-02.png" alt=""></a>
            <div class="ass1-comments__content">
                <a href="#" class="ass1-comments__name">{{cmt.fullname}}</a>
                <span class="ass1-comments__passed">}{{time_added}}</span>
                <p>{{cmt.comment}}</p>
                <div class="ass1-comments__info">
                    <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i><span>901</span></a>
                    <a href="#" class="ass1-comments__btn-down ass1-btn-icon"><i class="icon-Downvote"></i><span>36</span></a>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'item-post-comment',
    props:{
        cmt: {
            type: Object,
            default: {}
        }
    }
}
</script>

<style>

</style>