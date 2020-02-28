import React, { Fragment } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import SpaceBetween from './SpaceBetween';

interface IProps {
  jobs: Job[]
  onClickListItem: (job: Job) => void
}

const JobList: React.SFC<IProps> = ({ jobs, onClickListItem }) => {
  return (
    <Paper>
      <List>
        {
          jobs.map((j, i) => (
            <Fragment key={j.id}>
              <ListItem alignItems="flex-start" onClick={e => onClickListItem(j)}>
                {/* <ListItemAvatar>
                  <Avatar alt={String(i + 1)} />
                </ListItemAvatar> */}
                <ListItemText
                  primary={
                    <>
                      {i + 1}、{j.name}
                      <SpaceBetween width></SpaceBetween>
                      <small className="text-red">
                        {j.pay}
                      </small>
                    </>
                  }
                  secondary={
                    <React.Fragment>
                      <SpaceBetween></SpaceBetween>
                      <div className="text-info">
                        {j.address.replace('广西', '').replace('壮族自治区', '').replace('南宁市', '')}
                      </div>
                      <SpaceBetween></SpaceBetween>
                      <div className="text-info">
                        {j.company}
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {
                i < jobs.length ? (
                  <Divider component="li" />
                ) : null
              }
            </Fragment>
          ))
        }
      </List>
    </Paper>

  )
}

export default React.memo(JobList)
