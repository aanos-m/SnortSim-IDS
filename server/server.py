from flask import Flask, jsonify
from scapy.all import sniff 
import json

app = Flask(__name__)

@app.route("/sniff")
def start_sniffing():
    capture = sniff(count=10)  # Capture 10 packets
    packets = [str(packet.summary()) for packet in capture]
    # return jsonify(packets)

    return {"packets": packets}


    # with open("sniffer.txt", "w") as file:
    #     for packet in capture:
    #         file.write(str(packet.summary()) + "\n")

    # packets = [str(packet.summary()) for packet in capture]

    # with open("sniffer.json", "w") as file:
    #     json.dump(packets, file, indent=2)

    # return "Sniffing complete!"

if __name__ == "__main__":
    app.run(debug=True)