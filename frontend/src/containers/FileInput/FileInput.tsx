import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  multiple?: boolean;
}

const FileInput: React.FC<Props> = ({
  onChange,
  name,
  label,
  multiple = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (multiple) {
        setFilename(`Select files: ${e.target.files.length}`);
      } else {
        setFilename(e.target.files[0].name);
      }
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={name}
        multiple={multiple}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid direction="row" spacing={2}>
        <Grid>
          <TextField
            disabled
            label={label}
            value={filename}
            onClick={activateInput}
            fullWidth
          />
        </Grid>
        <Grid>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
