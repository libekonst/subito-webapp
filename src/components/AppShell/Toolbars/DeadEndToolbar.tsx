import React, { FC } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PageTitle from './PageTitle';
import LeftIconButton from './LeftIconButton';

interface IProps {
  onGoBack?: (e: any) => void;
  pageTitle: string;
}
const DeadEndToolbar: FC<IProps> = props => {
  const { onGoBack, pageTitle } = props;
  return (
    <Toolbar>
      <LeftIconButton onClick={onGoBack} aria-label="Πίσω" title="Πίσω">
        <ArrowBackIcon />
      </LeftIconButton>
      <PageTitle pageTitle={pageTitle} />
    </Toolbar>
  );
};

export default DeadEndToolbar;
