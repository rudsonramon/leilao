import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'
import { Container, FileInfo, Preview } from './style'

const FileList = ({ files }) => (
  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={uploadedFile.preview} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              {uploadedFile.readableSize}
              <button onClick={() => {}}>Excluir</button>
            </span>
          </div>
        </FileInfo>
        <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: '#7159c1' }
              }}
              strokeWidth={10}
              percentage={uploadedFile.progress}
            />
          )}
          {uploadedFile.url && (
            <a
              href="https://leilao-bucket.s3.amazonaws.com/88527f6f-e370-4658-87d0-9307d8e473a5.png"
              target="_blank"
              rel="noopener norefferer"
            >
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}
          {uploadedFile.uploaded && (
            <MdCheckCircle
              style={{ marginRight: 8 }}
              size={24}
              color="#78e5d5"
            />
          )}
          {uploadedFile.error && (
            <MdError style={{ marginRight: 8 }} size={24} color="#e57878" />
          )}
        </div>
      </li>
    ))}
  </Container>
)
export default FileList
