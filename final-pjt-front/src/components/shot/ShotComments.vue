<template>
  <div class="py-1 d-flex justify-content-between">
    <div>
      <div @click="moveProfile" class="mouse-cursor-custom">
        <font-awesome-icon
          v-if="!comment.user.profile_image"
          icon="fa-solid fa-circle-user"
          size="xl"
          :style="{ color: '#6E30F2' }"
        />
        <img
          v-else
          :src="imagePath(shot.user.profile_image)"
          alt="profile image"
        />
        <strong> {{ commentUserUsername }}</strong>
      </div>
      <span v-if="!isUpdating">
        {{ comment.content }}
      </span>
      <input v-else type="text" v-model="updatedComment" />
      <div v-if="!isUpdating" class="ms-4">
        <small>
          <small class="text-muted">{{ createdAt }}</small>
        </small>
      </div>
    </div>
    <div>
      <span v-if="currentUser.pk === comment.user.pk">
        <span v-if="!isUpdating">
          <button
            @click="changeUpdate"
            class="btn btn-link btn-sm text-muted p-0"
          >
            수정
          </button>
          <button
            @click="deleteComment"
            class="btn btn-link btn-sm text-muted p-0"
          >
            삭제
          </button>
        </span>
        <button
          v-else
          @click="updateComment"
          class="btn btn-link btn-sm text-muted p-0"
        >
          저장
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import { difTime } from "@/assets/js/common.js";
import { mapGetters, mapActions } from "vuex";
import { BACKEND_HOST } from "@/assets/js/common.js";
export default {
  name: "ShotComments",
  data() {
    return {
      isUpdating: false,
      updatedComment: this.comment.content,
    };
  },
  props: {
    comment: Object,
    shotId: Number,
  },
  computed: {
    ...mapGetters(["currentUser"]),
    commentUserUsername() {
      return this.comment?.user.username;
    },
    imagePath(img) {
      return BACKEND_HOST + img;
    },
    createdAt() {
      return difTime(this.comment.created_at);
    },
  },
  methods: {
    ...mapActions(["updateShotComment", "deleteShotComment"]),
    changeUpdate() {
      this.isUpdating = true;
    },
    updateComment() {
      if (this.currentUser.pk) {
        this.isUpdating = false;
        const data = {
          shotPk: this.shotId,
          commentPk: this.comment.id,
          content: this.updatedComment,
        };
        this.updateShotComment(data);
      } else {
        this.$bvModal.show("modal-login");
      }
    },
    deleteComment() {
      if (this.currentUser.pk) {
        const data = { shotPk: this.shotId, commentPk: this.comment.id };
        this.deleteShotComment(data);
      } else {
        this.$bvModal.show("modal-login");
      }
    },
    moveProfile() {
      // 프로필 페이지에서 동일한 프로필 페이지로 이동 시 NavigationDuplicated 에러 방지를 위한 검사
      if (this.$route.path !== `/profile/${this.commentUserUsername}`) {
        this.$router.push({
          name: "profile",
          params: { username: this.commentUserUsername },
        });
      }
      this.$bvModal.hide("modal-shot");
    },
  },
};
</script>

<style></style>
