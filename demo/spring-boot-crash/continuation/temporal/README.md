# Optional Temporal implementation
Start local Inventory and Payment participants first. Run `temporal server start-dev` in another terminal (install Temporal CLI separately). Set WORKFLOW_SECRET locally.
From this folder run `mvn compile exec:java -Dexec.mainClass=hub.temporal.WorkerMain`.
In another terminal run `mvn exec:java -Dexec.mainClass=hub.temporal.ClientMain -Dexec.args=<fresh-uuid>`.
Do not start the custom coordinator for this same workflow ID.
This minimal engine version covers reserve/charge/commit and payment-decline release. Activity exhaustion leaves a failed workflow requiring reconciliation; it does not guess that an unknown charge failed or automatically release stock. The custom coordinator demonstrates post-charge refunds separately.
