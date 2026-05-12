export function useImgLoad(key: string, hasImage: boolean) {
  const loaded = useState(key, () => !hasImage);
  const imgEl = useTemplateRef<HTMLImageElement>('imgEl');

  onMounted(() => {
    if (imgEl.value?.complete) loaded.value = true;
  });

  return { loaded };
}
