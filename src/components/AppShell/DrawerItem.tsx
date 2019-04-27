import React, { FC, ComponentPropsWithRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import DraftsIcon from '@material-ui/icons/Drafts';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {
  selected?: boolean;
  itemText?: string;
  icon?: 'people' | 'messages';
}
type Props = IProps & ComponentPropsWithRef<typeof ListItem>;

const DrawerItem: FC<Props> = props => {
  const { selected, itemText, icon, classes, ...rest } = props;
  function pickIcon() {
    switch (icon) {
      case 'people':
        return <PeopleIcon color={selected ? 'primary' : 'inherit'} />;
      case 'messages':
        return <DraftsIcon color={selected ? 'primary' : 'inherit'} />;
      default:
        return <DraftsIcon color={selected ? 'primary' : 'inherit'} />;
    }
  }
  return (
    <ListItem button className={selected ? classes.selectedTile : undefined} {...rest}>
      <ListItemIcon>{pickIcon()}</ListItemIcon>
      <ListItemText
        primary={itemText}
        primaryTypographyProps={
          selected ? { color: 'primary', className: classes.selectedText } : undefined
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
      borderLeftWidth: theme.spacing.unit / 2,
      borderLeftStyle: 'solid',
      borderLeftColor: theme.palette.primary.main,
    },
  });

export default withStyles(styles)(DrawerItem);
