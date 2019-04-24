import React from 'react';
// prettier-ignore
import { PhotoPicker } from 'aws-amplify-react'
import {
  Form,
  Button,
  Input,
  Notification,
  Radio,
  Progress
} from 'element-react';
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import { createProduct } from '../graphql/mutations';
import aws_exports from '../aws-exports';
import { convertDollarsToCents } from '../utils';
// import { Shield } from 'aws-sdk/clients/all';

const initialState = {
  description: '',
  price: '',
  shipped: false,
  imagePreview: '',
  isUploading: false,
  percentUploaded: 0
};

class NewProduct extends React.Component {
  state = {
    ...initialState
  };

  handleAddProduct = async () => {
    try {
      this.setState({ isUploading: true });
      const visibility = 'public';
      const { identityId } = await Auth.currentCredentials();
      const fileName = `/${visibility}/${identityId}/${Date.now()}}-`;
      const updatedFile = await Storage.put(fileName, this.state.image.file, {
        contentType: this.state.image.type,
        progressCallback: progress => {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          const percentUploaded =
            Math.round(progress.loaded / progress.total) * 100;
          this.setState({ percentUploaded });
        }
      });
      const file = {
        key: updatedFile.key,
        bucket: aws_exports.aws_user_files_s3_bucket,
        region: aws_exports.aws_user_files_s3_bucket_region
      };
      const input = {
        productMarketId: this.props.marketId,
        description: this.state.description,
        price: convertDollarsToCents(this.state.price),
        shipped: this.state.shipped,
        file
      };
      await API.graphql(graphqlOperation(createProduct, { input }));
      Notification({
        title: 'Success',
        message: 'Product successfully created',
        type: 'success'
      });
      this.setState({ ...initialState });
    } catch (err) {
      console.error('Error adding product', err);
    }
  };

  render() {
    const {
      description,
      price,
      image,
      shipped,
      imagePreview,
      isUploading,
      percentUploaded
    } = this.state;
    return (
      <div className="flex-center">
        <h2 className="header">Add New Produce</h2>
        <div>
          <Form className="market-header">
            <Form.Item label="Add Product Description">
              <Input
                type="text"
                icon="information"
                placeholder="Description"
                value={description}
                onChange={description => this.setState({ description })}
              />
            </Form.Item>
            <Form.Item label="Set Product Price">
              <Input
                type="number"
                icon="plus"
                placeholder="Price (USD)"
                value={price}
                onChange={price => this.setState({ price })}
              />
            </Form.Item>
            <Form.Item label="Is the Product Shipped or Emailed to the Customer?">
              <div className="text-center">
                <Radio
                  value="true"
                  checked={shipped === true}
                  onChange={() => this.setState({ shipped: true })}
                >
                  Shipped
                </Radio>
                <Radio
                  value="false"
                  checked={shipped === false}
                  onChange={() => this.setState({ shipped: false })}
                >
                  Emailed
                </Radio>
              </div>
            </Form.Item>
            {imagePreview && (
              <img
                className="image-preview"
                src={imagePreview}
                alt="Product Preview"
              />
            )}
            {percentUploaded > 0 && (
              <Progress
                type="circle"
                className="progress"
                status="success"
                percentage={percentUploaded}
              />
            )}
            <PhotoPicker
              title="Product Image"
              preview="hidden"
              onLoad={url => this.setState({ imagePreview: url })}
              onPick={file => this.setState({ image: file })}
              theme={{
                formContainer: {
                  margin: 0,
                  padding: '0.8rem'
                },
                formSection: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                sectionBody: {
                  margin: 0,
                  width: '250px'
                },
                sectionHeader: {
                  padding: '0.2rem',
                  color: 'var(--darkAmazonOrange)'
                },
                photoPickerButton: {
                  display: 'none'
                }
              }}
            />
            <Form.Item>
              <Button
                disabled={!image || !description || !price || isUploading}
                type="primary"
                onClick={this.handleAddProduct}
                loading={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Add Product'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default NewProduct;
