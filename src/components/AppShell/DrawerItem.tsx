import React, { FC, ComponentPropsWithRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import MailsIcon from '@material-ui/icons/Email';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {
  selected?: boolean;
  itemText?: string;
  icon?: 'people' | 'messages';
}
type Props = IProps & ComponentPropsWithRef<typeof ListItem>;
const colorType: 'primary' | 'secondary' = 'primary';
const DrawerItem: FC<Props> = props => {
  const { selected, itemText, icon, classes, ...rest } = props;
  function pickIcon() {
    switch (icon) {
      case 'people':
        return <PeopleIcon color={selected ? colorType : 'inherit'} />;
      case 'messages':
        return <MailsIcon color={selected ? colorType : 'inherit'} />;
      default:
        return <MailsIcon color={selected ? colorType : 'inherit'} />;
    }
  }
  return (
    <ListItem
      button
      // selected={selected}
      className={selected ? classes.selectedTile : undefined}
      {...rest}
    >
      <ListItemIcon>{pickIcon()}</ListItemIcon>
      <ListItemText
        primary={itemText}
        primaryTypographyProps={
          selected ? { color: colorType, className: classes.selectedText } : undefined
        }
      />
    </ListItem>
  );
};
const styles = (theme: Theme) =>
  createStyles({
    selectedText: {
      fontWeight: 550,
    },
    selectedTile: {
      position: 'relative',
      '&:before': {
        content: "''",
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: theme.spacing.unit / 2,
        backgroundColor: theme.palette[colorType].main,
      },
      '&:after': {
        content: "''",
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: theme.spacing.unit,
        borderRadius: '0 10px 10px 0',
        // borderRadius: '0 40px 40px 0',
        // @ts-ignore
        backgroundColor: colorType === 'primary' ? '#e3f2fd' : '#fce4ec',
        zIndex: -1,
      },
    },
  });

export default withStyles(styles)(DrawerItem);
