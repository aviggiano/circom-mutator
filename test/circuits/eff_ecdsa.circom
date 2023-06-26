// https://github.com/personaelabs/spartan-ecdsa/blob/4891c26056a72c8791f1db36f30a972bcdefb93a/packages/circuits/eff_ecdsa_membership/eff_ecdsa.circom

pragma circom 2.1.2;

include "./secp256k1/mul.circom";
include "../../../node_modules/circomlib/circuits/bitify.circom";

/**
 *  EfficientECDSA
 *  ====================
 *  
 *  Converts inputted efficient ECDSA signature to an public key. There is no
 *  public key validation included.
 */
template EfficientECDSA() {
    var bits = 256;
    signal input s;
    signal input Tx; // T = r^-1 * R
    signal input Ty; 
    signal input Ux; // U = -(m * r^-1 * G)
    signal input Uy;

    signal output pubKeyX;
    signal output pubKeyY;

    // sMultT = s * T
    component sMultT = Secp256k1Mul();
    sMultT.scalar <== s;
    sMultT.xP <== Tx;
    sMultT.yP <== Ty;

    // pubKey = sMultT + U 
    component pubKey = Secp256k1AddComplete();
    pubKey.xP <== sMultT.outX;
    pubKey.yP <== sMultT.outY;
    pubKey.xQ <== Ux;
    pubKey.yQ <== Uy;

    pubKeyX <== pubKey.outX;
    pubKeyY <== pubKey.outY;
}