<template>
  <div class="mt-4">
    <HeadingsH1 class="text-xl text-slate-800 dark:text-slate-200 my-7 mt-3">
      <slot name="title">Job Benefits</slot>
    </HeadingsH1>
    <p class="text-justify text-slate-700 dark:text-slate-100 pl-3">
      <slot name="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti placeat esse, dicta architecto laboriosam
        aliquam a ipsa. Laboriosam temporibus officiis suscipit in id magni, commodi nam, at atque corporis architecto!
      </slot>
    </p>
  </div>
</template>