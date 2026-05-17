# BlueChat Protocol Design

## Technology
BLE (Bluetooth Low Energy) via Web Bluetooth API

## GATT Service
| Role    | UUID                                   |
|---------|----------------------------------------|
| Service | 0000ffe0-0000-1000-8000-00805f9b34fb   |
| TX      | 0000ffe1-0000-1000-8000-00805f9b34fb   |
| RX      | 0000ffe2-0000-1000-8000-00805f9b34fb   |

## Packet Format
+--------+---------------------------+
| 1 byte |        N bytes            |
| TYPE   |        PAYLOAD            |
+--------+---------------------------+

## Message Types
- 0x01 = TEXT: [0x01][UTF-8 text]
- 0x02 = FILE START: [0x02][JSON metadata]
- 0x03 = FILE CHUNK: [0x03][512 bytes of data]
- 0x04 = FILE END: [0x04]
- 0x05 = ACK: [0x05]

## File Transfer Flow
Sender sends FILE_START → FILE_CHUNK (x many) → FILE_END
Receiver sends ACK after complete
Sender shows double tick ✓✓

## Chunk Size
512 bytes per chunk (safe for BLE MTU limit)