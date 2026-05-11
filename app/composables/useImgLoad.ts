export function useImgLoad(key: string, hasImage: boolean) {
  const loaded = useState(key, () => !hasImage);
  const imgEl = useTemplateRef<{ $el: HTMLImageElement }>('imgEl');

  onMounted(() => {
    if (imgEl.value?.$el?.complete) loaded.value = true;
  });

  return {
    loaded,
    imgEl,
  };
}
