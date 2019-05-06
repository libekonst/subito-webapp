import React, { FC, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {}
const CancelSubmitionInfoCard: FC<IProps> = props => {
  const [expanded, toggleExpand] = useState(false);
  const handleExpand = () => toggleExpand(!expanded);
  return (
    <Card className={props.classes.formControl}>
      <CardContent>
        <Typography
          className={props.classes.smallHeader}
          color="textSecondary"
          gutterBottom
        >
          Ακύρωση τελευταίας υποβολής
        </Typography>
        <Typography color="textPrimary" gutterBottom align="left">
          Αυτή η επιλογή αντικαθιστά τις ώρες υπερωρίας με τον αριθμό μηδέν (0) στο
          μήνυμα που θα αποσταλεί.
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography paragraph align="left">
            Πρόκειται για αναίρεση προηγηθείσας υποβολής απασχολούμενου, πριν η δηλωθείσα
            υπερεργασία ή νόμιμη υπερωριακή απασχόληση αρχίσει να πραγματοποιείται. Σε
            αυτήν την περίπτωση, τα πεδία ώρας μηδενίζονται. Απαραίτητη προϋπόθεση για
            την υποβολή ακύρωσης είναι να υφίσταται προηγούμενη υποβολή για τον ίδιο
            απασχολούμενο με Ημερομηνία και Ώρα Έναρξης της υπερεργασίας μεταγενέστερη
            της Ημερομηνίας –Ώρας υποβολής της ακύρωσης.
          </Typography>
        </Collapse>
        <CardActions className={props.classes.actions}>
          <Button color="primary" onClick={handleExpand}>
            {expanded ? 'Λιγοτερα' : 'Περισσοτερα'}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing.unit * 2,
      display: 'block',
    },

    smallHeader: {
      fontSize: '1rem',
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  });

export default withStyles(styles)(CancelSubmitionInfoCard);
