'use client';
import {
  Box,
  BoxProps,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { forwardRef, useContext, useState } from "react";
import DefaultContext from "../DefaultContext";
import { Close } from "@mui/icons-material";
import LinkProvierForm from "@/components/Firebase/LinkProviderForm";
import { UpdateProfileForm } from "@/components/Firebase/UpdateProfileForm";
import { TransitionProps } from "@mui/material/transitions";

const SlideTransition = forwardRef(function SlideTransition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TabPanelProps = BoxProps<
  'div',
  {
    title: string;
    tabValue: string;
    value: string;
  }
>;
function TabPanel({
  children,
  title,
  tabValue,
  value,
  ...props
}: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== tabValue}
      px={2}
      {...props}
    >
      <Typography
        variant="h6"
        mb={2}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
}

export default function AccountSettingPopup({
  ...props
}: Omit<DialogProps, 'open'>): React.ReactNode {
  const {
    accountSettingPopup: {
      isOpen,
      close,
    }  
  } = useContext(DefaultContext);

  const [ tab, setTab ] = useState<'profile' | 'signin-method'>('profile');

  const isMobile = useMediaQuery('(max-width:809px)');

  return (
    <Dialog
      open={isOpen}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      TransitionComponent={SlideTransition}
      {...props}
    >
      <DialogTitle
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <IconButton
          edge="start"
          onClick={() => {
            close();
          }}
          sx={{
            mr: 2,
          }}
        >
          <Close
          />
        </IconButton>
        アカウント設定
      </DialogTitle>

      <DialogContent
      >
        <Stack
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <Tabs
            orientation={isMobile ? 'horizontal' : 'vertical'}
            centered={isMobile}
            variant={isMobile ? 'fullWidth' : 'scrollable'}
            textColor="secondary"
            indicatorColor="secondary"
            value={tab}
            onChange={(e, newValue) => {
              setTab(newValue);
            }}
            sx={isMobile ? {
            } : {
              borderRight: 1,
              borderColor: 'divider',
            }}
          >
            <Tab
              label="プロフィール"
              value="profile"
            />
            <Tab
              label="ログイン方法"
              value="signin-method"
            />
          </Tabs>

          <Box
            flexGrow={1}
            mt={isMobile ? 2 : 0}
          >
            <TabPanel
              tabValue={tab}
              value="profile"
              title="プロフィール"
            >
              <UpdateProfileForm
              />
            </TabPanel>

            <TabPanel
              tabValue={tab}
              value="signin-method"
              title="ログイン方法"
            >
              <LinkProvierForm
              />
            </TabPanel>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
