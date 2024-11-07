import getAllLangLocale from "@/ai/getAllLangLocale";
import Form from "@/components/form";

const HomePage = async () => {
  const allLangLocale = await getAllLangLocale();

  const selectedLocales: string[] = [];
  return (
    <Form allLangLocale={allLangLocale} selectedLocales={selectedLocales} />
  );
};
export default HomePage;
