export const processDongtags = (caption) => {
  const dongtags = caption.match(/[\d]+동/g) || [];
  return dongtags.map((dongtag) => ({
    where: { dongtag },
    create: { dongtag },
  }));
};
