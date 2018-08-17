<template>
  <div class="main-form-container">
    <div class="form-container">
      <div class="information">
        <h3>{{title}}</h3>
        <p>{{description}}</p>
      </div>
      <div class="action">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    description: String
  }
}
</script>
<style scoped>
.main-form-container {
  padding: 16px;
}
.form-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.action {
  margin-left: auto;
}
.information > h3 {
  font-size: 1.6rem;
  font-weight: 300;
  color: white;
}
.information > h3::first-letter {
  text-transform: capitalize;
}
.information > p {
  font-size: 1rem;
  font-weight: 300;
  color: var(--ds-txt-2);
}
.information > p::first-letter {
  text-transform: capitalize;
}
</style>
