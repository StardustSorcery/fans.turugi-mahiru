'use client';
import MD2Material from "@/components/MD2Material/MD2Material";
import {
  Box,
  BoxProps,
  Container,
} from "@mui/material";

export default function About({
  ...props
}: BoxProps): React.ReactNode {
  return (
    <Box
      {...props}
    >
      <Container
        maxWidth="md"
        disableGutters
      >
        <Box
          component="img"
          src="/_resources/images/twitter-header.png"
          sx={{
            width: '100%',
            borderRadius: theme => `${theme.shape.borderRadius}px`
          }}
        />
      </Container>

      <Box
      >
        <MD2Material
          markdown={[
            '- この Web サイト "剣城まひる.fans" (以下 "当サイト") は VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイトです.',
            '- 当サイトは [Stardust Sorcery](https://ggtk.app/) が開発・運営しており, 剣城まひるさんおよび所属事務所は一切関係ありません.',
            '- 当サイトで使用している画像のうち, Stardust Sorcery が制作していないものの著作権・肖像権等は各権利者に帰属します.',
            '- 当サイトで使用している画像のうち, トップページ等に掲載しているキービジュアルの著作権は山田葵 (敬称略) に帰属します.',
            '- 当サイト・システムおよび上記以外の当サイトで使用している画像の著作権・肖像権等は Stardust Sorcery に帰属します.',
            '- 可能な限り正確な情報を掲載するよう努めていますが, 誤った情報や古い情報が掲載されている可能性があります.',
            '- 当サイトに関するお問い合わせは [お問い合わせ](/contact) よりお送りください.',
          ].join('\n')}
        />
      </Box>
    </Box>
  );
}
