import { styled } from '@nextui-org/react';

export const Link = styled('a', {
  display: 'inline-block',
  margin: 0,
  color: '$yellow600',
  '&:hover': {
    color: '$yellow500',
  },
  '&:active': {
    color: '$yellow400',
  },
  '&:visited': {
    color: '$yellow300',
  },
});
