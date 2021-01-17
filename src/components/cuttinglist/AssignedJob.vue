<template>
  <div class="assigned-jobs">
    {{ job.petNr }} {{ job.jobBulks }} Bulks - {{ job.jobPacks }} Packs
    <i class="fas fa-times-circle" @click="deleteJob(job)"></i>
  </div>
</template>

<script>
export default {
  props: ['job'],
  methods: {
    deleteJob(job) {
      this.$emit('delete-job', job.petNr);
    },
  },
};
</script>

<style scoped>
.assigned-jobs {
  text-align: left;
}
</style>
