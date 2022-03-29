from distributed import apply_gradient_allreduce
from model import Tacotron2


def load_model(hparams):
    model = Tacotron2(hparams).to('cpu')

    if hparams.distributed_run:
        model = apply_gradient_allreduce(model)

    return model