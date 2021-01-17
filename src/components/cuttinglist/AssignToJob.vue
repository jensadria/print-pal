<template>
  <div class="jobs-input">
    <input
      type="text"
      name="pet-nr"
      id="pet-nr"
      placeholder="PET Number"
      v-model="petNr"
    />
    <input
      type="number"
      name="job-bulks"
      id="job-bulks"
      min="0"
      v-model="jobBulks"
    />
    <input
      type="number"
      name="job-packs"
      id="job-packs"
      min="0"
      v-model="jobPacks"
    />
    <span id="assign-to-job" @click.prevent="assignToJob">
      + Assign to Job
    </span>
    <i class="fas fa-times-circle"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      petNr: '',
      jobBulks: 0,
      jobPacks: 0,
    };
  },
  methods: {
    assignToJob() {},
  },
};
</script>

<style></style>
