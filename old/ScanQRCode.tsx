import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonNote, useIonToast } from '@ionic/react';
import { BarcodeScanner, BarcodesScannedEvent } from '@capacitor-mlkit/barcode-scanning';
import { useState, useRef, useEffect } from 'react';
import './ScanQRCode.css';

const ScanQRCode: React.FC = () => {
  const [scannedResult, setScannedResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [present] = useIonToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  // This effect will run when the component unmounts to ensure everything is cleaned up.
  useEffect(() => {
    return () => {
      stopScan(true); // Force stop scan on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startScan = async () => {

    // Check for permissions first
    const granted = await requestPermissions();
    if (!granted) {
      present({ message: 'Camera permission is required to scan barcodes.', duration: 3000, color: 'danger' });
      return;
    }

    // Hide the background to show the camera feed.

    // Add listener for scanned barcodes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const listener = await BarcodeScanner.addListener(
    //   'barcodesScanned',
    //   async (result: BarcodesScannedEvent) => {
    //     if (result.barcodes.length > 0) {
    //       setScannedResult(result.barcodes[0].displayValue);
    //     }
    //     // Stop scanning once a barcode is detected
    //     await stopScan();
    //     // TODO: figure out why stopScan does not stop the scan immediately
    //   }
    // );

    // Start the scanner
    // On web, we need to pass the video element to the startScan method
    const options = videoRef.current ? { videoElement: videoRef.current } : {};
    await BarcodeScanner.startScan(options);
    setIsScanning(true);
  };

  const stopScan = async (force?: boolean) => {
    if (!isScanning && !force) {
      return;
    }

    // Show the background again

    // Stop the scanner
    await BarcodeScanner.stopScan();

    // Remove all listeners
    await BarcodeScanner.removeAllListeners();

    setIsScanning(false);
  };

  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan Barcode</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`ion-padding scanner-content${isScanning ? ' barcode-scanner-active' : ''}`}>
        <div className="scanner-container">
          {!isScanning && (
            <IonButton expand="block" onClick={startScan}>Start Scan</IonButton>
          )}

          {scannedResult && (
            <IonNote className="scan-result-note">
              <p>Scanned Result:</p>
              <p>{scannedResult}</p>
            </IonNote>
          )}

          {isScanning && (
            <>
              <IonButton expand="block" color="danger" onClick={() => stopScan()} className="stop-scan-button">Stop Scan</IonButton>
              {/* <video ref={videoRef} className="scanner-video" muted playsInline></video> */}
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ScanQRCode;
