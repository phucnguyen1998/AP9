import { KeyboardArrowDown, KeyboardArrowUp, LabelOutlined } from '@mui/icons-material'
import {
  styled as MuiStyled,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  MenuItem,
  Theme,
  FormControl,
  InputLabel,
} from '@mui/material'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

export interface AP9SelectOption {
  id?: string
  value?: any
  label: string
}
export interface AP9SelectProps extends Omit<MuiSelectProps, 'onChange'> {
  options: Array<AP9SelectOption>
  id: string
  onChange?: (value: any) => void
  useLabelAsPlaceholder?: Boolean
}

const getValueIndex = (value: any, options: Array<AP9SelectOption>) => {
  let res
  options.forEach((opt: AP9SelectOption, index: number) => {
    if (value && value == opt.value) {
      res = index
    }
  })
  return res
}

const AP9Select = MuiStyled((props: AP9SelectProps) => {
  const { options, label, id, className, onClose, onOpen, onChange, value, useLabelAsPlaceholder, ...other } = props
  const [openning, setOpenning] = useState(false)
  const defaultValue = getValueIndex(value, options)
  const [selectedValue, setSelectedValue] = useState(defaultValue !== undefined ? defaultValue : '')
  const selectRef = useRef(null)

  useEffect(() => {
    let newSelectedValue: any = getValueIndex(value, options)
    if (newSelectedValue === undefined) {
      newSelectedValue = ''
    }

    if (selectedValue !== newSelectedValue) {
      setSelectedValue(newSelectedValue)
    }
  }, [value, options])

  const handleCloseClick = () => {
    setOpenning(false)
  }

  const handleOpenClick = () => {
    setOpenning(true)
  }

  const renderIconComponent = () => {
    return openning ? (
      <KeyboardArrowUp sx={{ fontSize: '20px', position: 'absolute', right: '2px' }} onClick={handleCloseClick} />
    ) : (
      <KeyboardArrowDown sx={{ fontSize: '20px', position: 'absolute', right: '2px' }} onClick={handleOpenClick} />
    )
  }

  const handleDropdownOpen = (event: SyntheticEvent<Element, Event>) => {
    if (typeof onOpen === 'function') {
      onOpen(event)
    }
    setOpenning(true)
  }

  const handleDropdownClose = (event: SyntheticEvent<Element, Event>) => {
    if (typeof onClose === 'function') {
      onClose(event)
    }
    setOpenning(false)

    if (selectRef?.current && useLabelAsPlaceholder) {
      Array.from((selectRef.current as HTMLDivElement).getElementsByTagName('label')).forEach(
        (labelEl: HTMLLabelElement) => {
          labelEl.classList.remove('MuiInputLabel-shrink')
          labelEl.setAttribute('data-shrink', 'false')
        }
      )
      Array.from((selectRef.current as HTMLDivElement).getElementsByClassName('MuiInputBase-root')).forEach(
        (divEl: Element) => {
          divEl.classList.remove('Mui-focused')
        }
      )
    }
  }

  const handleChange = (event: any) => {
    if (typeof onChange === 'function') {
      onChange(options[event.target.value]?.value)
    }
    setSelectedValue(event.target.value)
  }

  return (
    <FormControl
      fullWidth
      className={[className, useLabelAsPlaceholder ? 'useLabelAsPlaceholder' : ''].join(' ')}
      ref={selectRef}
    >
      <InputLabel id={`${id}-label`}>
        {!useLabelAsPlaceholder || (useLabelAsPlaceholder && !openning && selectedValue === '') ? label : ''}
      </InputLabel>

      <MuiSelect
        label={label}
        id={id}
        IconComponent={renderIconComponent}
        {...other}
        value={selectedValue}
        onOpen={handleDropdownOpen}
        onClose={handleDropdownClose}
        open={openning}
        onChange={handleChange}
      >
        {options.map((option: any, index: number) => {
          return (
            <MenuItem value={index} key={`select-${option?.value}`} disabled={option?.readOnly}>
              {option?.label}
            </MenuItem>
          )
        })}
      </MuiSelect>
    </FormControl>
  )
})((style: { theme: Theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: style.theme.palette.background.default,
  },
  '& .MuiSelect-select': {
    padding: '8px 12px',
  },

  '& label:not(.MuiInputLabel-shrink)': {
    transform: 'translate(8px, 12px) scale(1)',
    fontSize: 14,
    lineHeight: '16px',
    color: style.theme.palette.text.primary,
  },

  '& fieldset': {
    border: '1px solid #ECECEE',
  },

  '& .MuiInputBase-root:hover fieldset': {
    borderColor: style.theme.palette.text.secondary,
  },
  '&.useLabelAsPlaceholder fieldset': {
    top: 0,
  },
  '&.useLabelAsPlaceholder legend': {
    display: 'none',
  },
}))

export default AP9Select
