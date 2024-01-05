'use client';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  StackProps,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from 'next/link';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import validator from 'validator';

export default function ContactForm({
  ...props
}: StackProps<
  'div',
  {}
>): React.ReactNode {
  const [ firstName, setFirstName ] = useState<string>('');
  const [ familyName, setFamilyName ] = useState<string>('');
  const [ organization, setOrganization ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ body, setBody ] = useState<string>('');
  const [ privacyIsChecked, setPrivacyIsChecked ] = useState<boolean>(false);

  const [ isReady, setIsReady ] = useState<boolean>(false);

  useEffect(() => {
    setIsReady(
      !validator.isEmpty(firstName)
      && !validator.isEmpty(familyName)
      && validator.isEmail(email)
      && !validator.isEmpty(body)
      && privacyIsChecked
    );
  }, [
    firstName,
    familyName,
    organization,
    email,
    body,
    privacyIsChecked,
  ]);

  const [ isProcessing, setIsProcessing ] = useState<boolean>(false);
  const [ error, setError ] = useState<Error | null>(null);

  const handleSubmitClick = useCallback(() => {
    setIsProcessing(true);
    setError(null);

    return axios
      .request({
        method: 'POST',
        url: '/api/contact',
        data: {
          firstName,
          familyName,
          organization: organization || null,
          email,
          body,
        }
      })
      .catch(err => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, [
    firstName,
    familyName,
    organization,
    email,
    body,
  ]);

  return (
    <Stack
      gap={3}
      alignItems="center"
      {...props}
    >
      <Stack
        width="100%"
        flexDirection="row"
        gap={1}
      >
        <TextField
          label="姓"
          name="family-name"
          autoComplete="family-name"
          color="secondary"
          required
          fullWidth
          value={familyName}
          onChange={e => setFamilyName(e.target.value)}
        />

        <TextField
          label="名"
          name="given-name"
          autoComplete="given-name"
          color="secondary"
          required
          fullWidth
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </Stack>

      <TextField
        label="団体名"
        name="organization"
        autoComplete="organization"
        color="secondary"
        fullWidth
        value={organization}
        onChange={e => setOrganization(e.target.value)}

      />

      <TextField
        label="メールアドレス"
        type="email"
        name="email"
        autoComplete="email"
        color="secondary"
        required
        fullWidth
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <TextField
        label="お問い合わせ内容"
        name="body"
        autoComplete="off"
        color="secondary"
        required
        multiline
        rows={10}
        fullWidth
        value={body}
        onChange={e => setBody(e.target.value)}
      />

      <FormControlLabel
        label={
          <>
            <Link
              href="/privacy"
              target="_blank"
              component={NextLink}
              color="secondary"
            >
              プライバシーポリシー
            </Link>
             に同意する
          </>
        }
        control={
          <Checkbox
            color="secondary"
            checked={privacyIsChecked}
            onChange={e => setPrivacyIsChecked(e.target.checked)}
          />
        }
        required
      />

      <Button
        variant="contained"
        disableElevation
        color="secondary"
        fullWidth
        onClick={handleSubmitClick}
        disabled={!isReady || isProcessing}
      >
        送信
      </Button>

      {error && (
        <Typography
          align="center"
          color="error"
        >
          送信中にエラーが発生しました。
        </Typography>
      )}
    </Stack>
  );
}
