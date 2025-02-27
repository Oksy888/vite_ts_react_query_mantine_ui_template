import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Skeleton,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantinex/mantine-logo'
import { IconSun, IconMoon } from '@tabler/icons-react'
import cx from 'clsx'
import { Outlet } from 'react-router-dom'

export function FullLayout() {
  const [opened, { toggle }] = useDisclosure()
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      footer={{ height: { base: 60, md: 70, lg: 80 } }}
      aside={{
        width: 300,
        breakpoint: 'md',
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <MantineLogo size={30} />
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
            }
            variant="default"
            radius="xl"
            size="xl"
            aria-label="Toggle color scheme"
            styles={{
              root: {
                '&:focus, &:focus-visible': {
                  outline: 'none',
                },
              },
            }}
          >
            {computedColorScheme === 'light' ? (
              <IconMoon size={20} stroke={1.5} />
            ) : (
              <IconSun size={20} stroke={1.5} />
            )}
          </ActionIcon>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <AppShell.Aside p="md">Aside</AppShell.Aside>
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  )
}
