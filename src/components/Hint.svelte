<div class="hint-container">
  <div class="point" />
  <div class="text">
    <slot />
  </div>
</div>

<style>
  .hint-container {
    position: absolute;
    right: -101px;
    top: 5px;
    display: none;
  }

  .point {
    width: 0;
    height: 0;
    border-top: 17px solid transparent;
    border-right: 17px solid rgba(44, 44, 44, 1);
    border-bottom: 17px solid transparent;
    z-index: 3;
  }

  .text {
    position: relative;
    background: rgba(44, 44, 44, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 34px;
    border-radius: 0 3px 3px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
</style>
