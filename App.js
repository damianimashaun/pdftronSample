/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState, useEffect} from 'react';
import {Platform} from 'react-native';

import {
  DocumentView,
  RNPdftron,
  Config as PDFTronConfig,
} from '@pdftron/react-native-pdf';

const documentPath =
  'https://hv-hive-drive.s3.amazonaws.com/7driFnaZjDQZndHqs/s5tWuEw6zEc5udFKu/samp.pdf?AWSAccessKeyId=AKIAV6UM3WX3RULI7NX7&Expires=1646735499&Signature=%2BdIuJ25WvRfOG2CfBLzbgwkIKJU%3D';

const ANNOTATIONS = [
  {
    _id: 1,
    annotationId: '3e5ec85d-6349-ed90-2c74-b458947af047',
    xfdf: '<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><fields /><annots><square page="0" rect="126.910,517.040,253.810,637.720" color="#007A3B" flags="print" name="3e5ec85d-6349-ed90-2c74-b458947af047" title="Dami Animashaun" subject="Rectangle" date="D:20220304184757+01\'00\'" StrokeThickness="5.27471018913972" width="5.27471018913972" creationdate="D:20220304184751+01\'00\'"><trn-custom-data bytes="{&quot;annotationNumber&quot;:&quot;1&quot;,&quot;trn-mention&quot;:&quot;{\\&quot;contents\\&quot;:\\&quot;comm one\\&quot;,\\&quot;ids\\&quot;:[]}&quot;}"/><contents>comm one</contents></square></annots></xfdf>',
  },
  {
    _id: 2,
    annotationId: 'f2ca2ebd-adf3-1080-44a7-9cc17f62f5b6',
    xfdf: '<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><fields /><annots><text page="0" rect="126.910,606.720,157.910,637.720" color="#FFFF00" flags="print,nozoom,norotate" inreplyto="3e5ec85d-6349-ed90-2c74-b458947af047" name="f2ca2ebd-adf3-1080-44a7-9cc17f62f5b6" title="Dami Animashaun" subject="Note" date="D:20220304184800+01\'00\'" StrokeThickness="1" creationdate="D:20220304184800+01\'00\'" icon="Comment" statemodel="Review"><trn-custom-data bytes="{&quot;trn-mention&quot;:&quot;{\\&quot;contents\\&quot;:\\&quot;rep 1\\&quot;,\\&quot;ids\\&quot;:[]}&quot;}"/><contents>rep 1</contents></text></annots></xfdf>',
  },
  {
    _id: 3,
    annotationId: '3c6619b5-814a-25c4-b9f7-20d56de701dc',
    xfdf: '<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><fields /><annots><text page="0" rect="126.910,606.720,157.910,637.720" color="#FFFF00" flags="print,nozoom,norotate" inreplyto="3e5ec85d-6349-ed90-2c74-b458947af047" name="3c6619b5-814a-25c4-b9f7-20d56de701dc" title="Dami Animashaun" subject="Note" date="D:20220304184802+01\'00\'" StrokeThickness="1" creationdate="D:20220304184802+01\'00\'" icon="Comment" statemodel="Review"><trn-custom-data bytes="{&quot;trn-mention&quot;:&quot;{\\&quot;contents\\&quot;:\\&quot;sep 1\\&quot;,\\&quot;ids\\&quot;:[]}&quot;}"/><contents>sep 1</contents></text></annots></xfdf>',
  },
  {
    _id: 4,
    annotationId: 'bcb2b56e-8e97-41a5-8f8a-055cd65082af',
    xfdf: '<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><fields /><annots><text creationdate="D:20220304175024Z" flags="print,nozoom,norotate" inreplyto="3e5ec85d-6349-ed90-2c74-b458947af047" date="D:20220304175024Z" name="bcb2b56e-8e97-41a5-8f8a-055cd65082af" page="0" rect="126.91,637.72,146.91,657.72" title="Dami Animashaun" xmlns="http://ns.adobe.com/xfdf/"><contents>Zerer</contents></text></annots></xfdf>',
  },
];

const App = () => {
  const documentRef = useRef<DocumentView>(null);
  const [documentLoaded, setDocumentLoaded] = useState(false);

  useEffect(() => {
    RNPdftron.initialize('');
  }, []);

  useEffect(() => {
    (async () => {
      let annotationPromise = new Promise(resolve => resolve(''));

      if (documentLoaded && documentRef.current) {
        ANNOTATIONS.forEach(async annotation => {
          annotationPromise = annotationPromise.then(async () => {
            await documentRef?.current?.importAnnotationCommand(
              annotation.xfdf,
            );
          });
        });
      }
    })();
  }, [documentLoaded]);

  return (
    <DocumentView
      onDocumentLoaded={() => setDocumentLoaded(true)}
      ref={documentRef}
      document={documentPath}
      currentUser="myUser"
      followSystemDarkMode={false}
      hideDefaultAnnotationToolbars={[
        PDFTronConfig.DefaultToolbars.PrepareForm,
        PDFTronConfig.DefaultToolbars.Redaction,
      ]}
      {...(Platform.OS === 'android' && {
        topAppNavBarRightBar: [
          PDFTronConfig.Buttons.shareButton,
          PDFTronConfig.Buttons.viewControlsButton,
          PDFTronConfig.Buttons.saveCopyButton,
        ],
      })}
      collabEnabled
      annotationManagerEditMode={PDFTronConfig.AnnotationManagerEditMode.All}
      autoSaveEnabled={false}
    />
  );
};

export default App;
