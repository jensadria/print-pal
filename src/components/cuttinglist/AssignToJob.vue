<template>
  <div class="jobs-input">
    <label for="job-bulks">Job Nr</label>

    <input
      type="text"
      name="pet-nr"
      id="pet-nr"
      placeholder="PET"
      v-model="petNr"
    />
    <label for="job-bulks">Bulks</label>
    <input
      type="number"
      name="job-bulks"
      id="job-bulks"
      min="0"
      v-model="jobBulks"
    />
    <label for="job-bulks">Packs</label>

    <input
      type="number"
      name="job-packs"
      id="job-packs"
      min="0"
      v-model="jobPacks"
    />
    <button id="assign-to-job" @click.prevent="assignToJob">
      + Assign to Job
    </button>
  </div>
</template>

<script>
export default {
  emits: ['assign-to-job'],
  data() {
    return {
      petNr: '',
      jobBulks: 0,
      jobPacks: 0,
    };
  },
  methods: {
    assignToJob() {
      const assignedJob = {
        petNr: this.petNr,
        jobBulks: this.jobBulks,
        jobPacks: this.jobPacks,
      };

      this.$emit('assign-to-job', assignedJob);
    },
  },
};
</script>

<style scoped>
input {
  display: flex;
  border: 2px solid gray;
  border-top: none;
  border-right: none;
  border-left: none;
  margin-right: 10px;
  padding: 0.5px;
}

input:focus {
  border: 2px solid var(--mid-blue);
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: var(--very-light-blue);
  outline: none;
}
label {
  margin-right: 10px;
}

#job-bulks,
#job-packs {
  width: 50px;
}
</style>
