var CrudeTimingPlugin = function () {
};
CrudeTimingPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation) => {
    let startOptimizePhase;
    let chunk;

    compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
      // 使用粗略测量压缩时间的方法。
      // UglifyJSPlugin 在这个编译阶段完成全部工作，
      // 所以我们计算整个阶段的时间。
      startOptimizePhase = Date.now();
      chunk = chunks;
      // 对于异步阶段，不要忘记调用回调函数
      callback();
    });

    compilation.plugin('after-optimize-chunk-assets', () => {
      const optimizePhaseDuration = Date.now() - startOptimizePhase;
      console.log(`${Date.now()}--optimize-chunk-asset phase duration: ${optimizePhaseDuration}`)
      if (optimizePhaseDuration > 1000) {
        console.log(chunk.length);
      }
    });
  });
};

module.exports = CrudeTimingPlugin;
