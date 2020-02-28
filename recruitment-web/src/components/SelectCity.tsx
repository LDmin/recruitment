import React, { Fragment, useMemo, useCallback } from 'react'
import { Select, PopoverProps, Button, Divider, Input, Popover } from '@material-ui/core'
import citys from '@/utils/city'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import SpaceBetween from './SpaceBetween';

interface IProps {
  value: City
  onChange: (value: IProps['value']) => void
}

const SecondCitysGrid = styled(Grid)`

`

const SelectCity: React.SFC<IProps> = ({ value, onChange }) => {

  const firstCitys = useMemo(() => citys.filter(c => c.pid === 1), [])
  const anchorOrigin = useMemo<PopoverProps['anchorOrigin']>(() => ({
    vertical: 'bottom',
    horizontal: 'left',
  }), [])

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const selectCity = useCallback((city: City) => {
    onChange(city)
    handleClose()
  }, [handleClose, onChange])

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} color="primary" onClick={handleClick}>
        {value.name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        {
          firstCitys.map((c, c_i) => {
            const secondCitys = citys.filter(cc => cc.pid === c.id)
            return (
              <Fragment key={c.id}>
                <Button color="primary" onClick={() => selectCity(c)}>
                  {c.name}
                </Button>
                <SecondCitysGrid container>
                  {
                    secondCitys.map(s => (
                      <Grid key={s.id} item xs={2}>
                        <Button color="secondary" onClick={() => selectCity(s)}>
                          {s.name}
                        </Button>
                      </Grid>
                    ))
                  }
                </SecondCitysGrid>
                {
                  c_i < firstCitys.length - 1 ? (
                    <Divider />
                  ) : null
                }
              </Fragment>
            )
          })
        }
      </Popover>
    </div>
  );
}

export default React.memo(SelectCity)
