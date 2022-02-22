const logMemoryUsage = () => {
  const used: any = process.memoryUsage();
  let text = "|";
  for (let key in used) {
    text += ` ${key} : ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB |`;
  }
  logger.info(text);
};

export { logMemoryUsage };
