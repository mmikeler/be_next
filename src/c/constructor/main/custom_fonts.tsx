import useStore from '@/src/store/store';
import { CustomFont } from '../custom_fonts';

export function Custom_Fonts_In_Head() {
  const customFonts = useStore((state: any) => state.fonts?.local || []);

  const fontsCSS = Object.values(customFonts).map((font: any, index: number) => {
    return (
      <style jsx global key={index}>
        {`
          @font-face {
            font-family: ${font.title};
            src: local(${font.title}), url(${font.file});
          }
          .__${font.title}__{
            font-family: ${font.title}
          }
          `}
      </style>
    )
  })

  return fontsCSS;
}