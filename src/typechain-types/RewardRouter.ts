/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace RewardRouterV2 {
  export type InitializeParamsStruct = {
    weth: AddressLike;
    gmx: AddressLike;
    esGmx: AddressLike;
    bnGmx: AddressLike;
    glp: AddressLike;
    stakedGmxTracker: AddressLike;
    bonusGmxTracker: AddressLike;
    extendedGmxTracker: AddressLike;
    feeGmxTracker: AddressLike;
    feeGlpTracker: AddressLike;
    stakedGlpTracker: AddressLike;
    glpManager: AddressLike;
    gmxVester: AddressLike;
    glpVester: AddressLike;
    externalHandler: AddressLike;
    govToken: AddressLike;
  };

  export type InitializeParamsStructOutput = [
    weth: string,
    gmx: string,
    esGmx: string,
    bnGmx: string,
    glp: string,
    stakedGmxTracker: string,
    bonusGmxTracker: string,
    extendedGmxTracker: string,
    feeGmxTracker: string,
    feeGlpTracker: string,
    stakedGlpTracker: string,
    glpManager: string,
    gmxVester: string,
    glpVester: string,
    externalHandler: string,
    govToken: string,
  ] & {
    weth: string;
    gmx: string;
    esGmx: string;
    bnGmx: string;
    glp: string;
    stakedGmxTracker: string;
    bonusGmxTracker: string;
    extendedGmxTracker: string;
    feeGmxTracker: string;
    feeGlpTracker: string;
    stakedGlpTracker: string;
    glpManager: string;
    gmxVester: string;
    glpVester: string;
    externalHandler: string;
    govToken: string;
  };
}

export interface RewardRouterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "BASIS_POINTS_DIVISOR"
      | "acceptTransfer"
      | "batchCompoundForAccounts"
      | "batchRestakeForAccounts"
      | "batchStakeGmxForAccounts"
      | "bnGmx"
      | "bonusGmxTracker"
      | "claim"
      | "claimEsGmx"
      | "claimFees"
      | "compound"
      | "esGmx"
      | "extendedGmxTracker"
      | "externalHandler"
      | "feeGlpTracker"
      | "feeGmxTracker"
      | "glp"
      | "glpManager"
      | "glpVester"
      | "gmx"
      | "gmxVester"
      | "gov"
      | "govToken"
      | "handleRewards"
      | "handleRewardsV2"
      | "inRestakingMode"
      | "inStrictTransferMode"
      | "initialize"
      | "isInitialized"
      | "makeExternalCalls"
      | "maxBoostBasisPoints"
      | "mintAndStakeGlp"
      | "mintAndStakeGlpETH"
      | "multicall"
      | "pendingReceivers"
      | "setGov"
      | "setGovToken"
      | "setInRestakingMode"
      | "setInStrictTransferMode"
      | "setMaxBoostBasisPoints"
      | "setVotingPowerType"
      | "signalTransfer"
      | "stakeEsGmx"
      | "stakeGmx"
      | "stakedGlpTracker"
      | "stakedGmxTracker"
      | "unstakeAndRedeemGlp"
      | "unstakeAndRedeemGlpETH"
      | "unstakeEsGmx"
      | "unstakeGmx"
      | "votingPowerType"
      | "weth"
      | "withdrawToken"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "StakeGlp" | "StakeGmx" | "UnstakeGlp" | "UnstakeGmx"): EventFragment;

  encodeFunctionData(functionFragment: "BASIS_POINTS_DIVISOR", values?: undefined): string;
  encodeFunctionData(functionFragment: "acceptTransfer", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "batchCompoundForAccounts", values: [AddressLike[]]): string;
  encodeFunctionData(functionFragment: "batchRestakeForAccounts", values: [AddressLike[]]): string;
  encodeFunctionData(functionFragment: "batchStakeGmxForAccounts", values: [AddressLike[], BigNumberish[]]): string;
  encodeFunctionData(functionFragment: "bnGmx", values?: undefined): string;
  encodeFunctionData(functionFragment: "bonusGmxTracker", values?: undefined): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(functionFragment: "claimEsGmx", values?: undefined): string;
  encodeFunctionData(functionFragment: "claimFees", values?: undefined): string;
  encodeFunctionData(functionFragment: "compound", values?: undefined): string;
  encodeFunctionData(functionFragment: "esGmx", values?: undefined): string;
  encodeFunctionData(functionFragment: "extendedGmxTracker", values?: undefined): string;
  encodeFunctionData(functionFragment: "externalHandler", values?: undefined): string;
  encodeFunctionData(functionFragment: "feeGlpTracker", values?: undefined): string;
  encodeFunctionData(functionFragment: "feeGmxTracker", values?: undefined): string;
  encodeFunctionData(functionFragment: "glp", values?: undefined): string;
  encodeFunctionData(functionFragment: "glpManager", values?: undefined): string;
  encodeFunctionData(functionFragment: "glpVester", values?: undefined): string;
  encodeFunctionData(functionFragment: "gmx", values?: undefined): string;
  encodeFunctionData(functionFragment: "gmxVester", values?: undefined): string;
  encodeFunctionData(functionFragment: "gov", values?: undefined): string;
  encodeFunctionData(functionFragment: "govToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "handleRewards",
    values: [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "handleRewardsV2",
    values: [AddressLike, boolean, boolean, boolean, boolean, boolean, boolean, boolean]
  ): string;
  encodeFunctionData(functionFragment: "inRestakingMode", values?: undefined): string;
  encodeFunctionData(functionFragment: "inStrictTransferMode", values?: undefined): string;
  encodeFunctionData(functionFragment: "initialize", values: [RewardRouterV2.InitializeParamsStruct]): string;
  encodeFunctionData(functionFragment: "isInitialized", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "makeExternalCalls",
    values: [AddressLike[], BytesLike[], AddressLike[], AddressLike[]]
  ): string;
  encodeFunctionData(functionFragment: "maxBoostBasisPoints", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mintAndStakeGlp",
    values: [AddressLike, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "mintAndStakeGlpETH", values: [BigNumberish, BigNumberish]): string;
  encodeFunctionData(functionFragment: "multicall", values: [BytesLike[]]): string;
  encodeFunctionData(functionFragment: "pendingReceivers", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "setGov", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "setGovToken", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "setInRestakingMode", values: [boolean]): string;
  encodeFunctionData(functionFragment: "setInStrictTransferMode", values: [boolean]): string;
  encodeFunctionData(functionFragment: "setMaxBoostBasisPoints", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "setVotingPowerType", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "signalTransfer", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "stakeEsGmx", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "stakeGmx", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "stakedGlpTracker", values?: undefined): string;
  encodeFunctionData(functionFragment: "stakedGmxTracker", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "unstakeAndRedeemGlp",
    values: [AddressLike, BigNumberish, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "unstakeAndRedeemGlpETH",
    values: [BigNumberish, BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unstakeEsGmx", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "unstakeGmx", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "votingPowerType", values?: undefined): string;
  encodeFunctionData(functionFragment: "weth", values?: undefined): string;
  encodeFunctionData(functionFragment: "withdrawToken", values: [AddressLike, AddressLike, BigNumberish]): string;

  decodeFunctionResult(functionFragment: "BASIS_POINTS_DIVISOR", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "acceptTransfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "batchCompoundForAccounts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "batchRestakeForAccounts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "batchStakeGmxForAccounts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bnGmx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bonusGmxTracker", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimEsGmx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimFees", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "compound", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "esGmx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "extendedGmxTracker", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "externalHandler", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeGlpTracker", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeGmxTracker", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "glp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "glpManager", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "glpVester", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gmx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gmxVester", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gov", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "govToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "handleRewards", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "handleRewardsV2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "inRestakingMode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "inStrictTransferMode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isInitialized", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "makeExternalCalls", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxBoostBasisPoints", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintAndStakeGlp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintAndStakeGlpETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pendingReceivers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setGov", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setGovToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setInRestakingMode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setInStrictTransferMode", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setMaxBoostBasisPoints", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setVotingPowerType", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "signalTransfer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakeEsGmx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakeGmx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakedGlpTracker", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakedGmxTracker", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstakeAndRedeemGlp", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstakeAndRedeemGlpETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstakeEsGmx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unstakeGmx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "votingPowerType", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "weth", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawToken", data: BytesLike): Result;
}

export namespace StakeGlpEvent {
  export type InputTuple = [account: AddressLike, amount: BigNumberish];
  export type OutputTuple = [account: string, amount: bigint];
  export interface OutputObject {
    account: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StakeGmxEvent {
  export type InputTuple = [account: AddressLike, token: AddressLike, amount: BigNumberish];
  export type OutputTuple = [account: string, token: string, amount: bigint];
  export interface OutputObject {
    account: string;
    token: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnstakeGlpEvent {
  export type InputTuple = [account: AddressLike, amount: BigNumberish];
  export type OutputTuple = [account: string, amount: bigint];
  export interface OutputObject {
    account: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnstakeGmxEvent {
  export type InputTuple = [account: AddressLike, token: AddressLike, amount: BigNumberish];
  export type OutputTuple = [account: string, token: string, amount: bigint];
  export interface OutputObject {
    account: string;
    token: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface RewardRouter extends BaseContract {
  connect(runner?: ContractRunner | null): RewardRouter;
  waitForDeployment(): Promise<this>;

  interface: RewardRouterInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;

  BASIS_POINTS_DIVISOR: TypedContractMethod<[], [bigint], "view">;

  acceptTransfer: TypedContractMethod<[_sender: AddressLike], [void], "nonpayable">;

  batchCompoundForAccounts: TypedContractMethod<[_accounts: AddressLike[]], [void], "nonpayable">;

  batchRestakeForAccounts: TypedContractMethod<[_accounts: AddressLike[]], [void], "nonpayable">;

  batchStakeGmxForAccounts: TypedContractMethod<
    [_accounts: AddressLike[], _amounts: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  bnGmx: TypedContractMethod<[], [string], "view">;

  bonusGmxTracker: TypedContractMethod<[], [string], "view">;

  claim: TypedContractMethod<[], [void], "nonpayable">;

  claimEsGmx: TypedContractMethod<[], [void], "nonpayable">;

  claimFees: TypedContractMethod<[], [void], "nonpayable">;

  compound: TypedContractMethod<[], [void], "nonpayable">;

  esGmx: TypedContractMethod<[], [string], "view">;

  extendedGmxTracker: TypedContractMethod<[], [string], "view">;

  externalHandler: TypedContractMethod<[], [string], "view">;

  feeGlpTracker: TypedContractMethod<[], [string], "view">;

  feeGmxTracker: TypedContractMethod<[], [string], "view">;

  glp: TypedContractMethod<[], [string], "view">;

  glpManager: TypedContractMethod<[], [string], "view">;

  glpVester: TypedContractMethod<[], [string], "view">;

  gmx: TypedContractMethod<[], [string], "view">;

  gmxVester: TypedContractMethod<[], [string], "view">;

  gov: TypedContractMethod<[], [string], "view">;

  govToken: TypedContractMethod<[], [string], "view">;

  handleRewards: TypedContractMethod<
    [
      _shouldClaimGmx: boolean,
      _shouldStakeGmx: boolean,
      _shouldClaimEsGmx: boolean,
      _shouldStakeEsGmx: boolean,
      _shouldStakeMultiplierPoints: boolean,
      _shouldClaimWeth: boolean,
      _shouldConvertWethToEth: boolean,
    ],
    [void],
    "nonpayable"
  >;

  handleRewardsV2: TypedContractMethod<
    [
      _gmxReceiver: AddressLike,
      _shouldClaimGmx: boolean,
      _shouldStakeGmx: boolean,
      _shouldClaimEsGmx: boolean,
      _shouldStakeEsGmx: boolean,
      _shouldStakeMultiplierPoints: boolean,
      _shouldClaimWeth: boolean,
      _shouldConvertWethToEth: boolean,
    ],
    [void],
    "nonpayable"
  >;

  inRestakingMode: TypedContractMethod<[], [boolean], "view">;

  inStrictTransferMode: TypedContractMethod<[], [boolean], "view">;

  initialize: TypedContractMethod<[_initializeParams: RewardRouterV2.InitializeParamsStruct], [void], "nonpayable">;

  isInitialized: TypedContractMethod<[], [boolean], "view">;

  makeExternalCalls: TypedContractMethod<
    [
      externalCallTargets: AddressLike[],
      externalCallDataList: BytesLike[],
      refundTokens: AddressLike[],
      refundReceivers: AddressLike[],
    ],
    [void],
    "nonpayable"
  >;

  maxBoostBasisPoints: TypedContractMethod<[], [bigint], "view">;

  mintAndStakeGlp: TypedContractMethod<
    [_token: AddressLike, _amount: BigNumberish, _minUsdg: BigNumberish, _minGlp: BigNumberish],
    [bigint],
    "nonpayable"
  >;

  mintAndStakeGlpETH: TypedContractMethod<[_minUsdg: BigNumberish, _minGlp: BigNumberish], [bigint], "payable">;

  multicall: TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;

  pendingReceivers: TypedContractMethod<[arg0: AddressLike], [string], "view">;

  setGov: TypedContractMethod<[_gov: AddressLike], [void], "nonpayable">;

  setGovToken: TypedContractMethod<[_govToken: AddressLike], [void], "nonpayable">;

  setInRestakingMode: TypedContractMethod<[_inRestakingMode: boolean], [void], "nonpayable">;

  setInStrictTransferMode: TypedContractMethod<[_inStrictTransferMode: boolean], [void], "nonpayable">;

  setMaxBoostBasisPoints: TypedContractMethod<[_maxBoostBasisPoints: BigNumberish], [void], "nonpayable">;

  setVotingPowerType: TypedContractMethod<[_votingPowerType: BigNumberish], [void], "nonpayable">;

  signalTransfer: TypedContractMethod<[_receiver: AddressLike], [void], "nonpayable">;

  stakeEsGmx: TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;

  stakeGmx: TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;

  stakedGlpTracker: TypedContractMethod<[], [string], "view">;

  stakedGmxTracker: TypedContractMethod<[], [string], "view">;

  unstakeAndRedeemGlp: TypedContractMethod<
    [_tokenOut: AddressLike, _glpAmount: BigNumberish, _minOut: BigNumberish, _receiver: AddressLike],
    [bigint],
    "nonpayable"
  >;

  unstakeAndRedeemGlpETH: TypedContractMethod<
    [_glpAmount: BigNumberish, _minOut: BigNumberish, _receiver: AddressLike],
    [bigint],
    "nonpayable"
  >;

  unstakeEsGmx: TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;

  unstakeGmx: TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;

  votingPowerType: TypedContractMethod<[], [bigint], "view">;

  weth: TypedContractMethod<[], [string], "view">;

  withdrawToken: TypedContractMethod<
    [_token: AddressLike, _account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;

  getFunction(nameOrSignature: "BASIS_POINTS_DIVISOR"): TypedContractMethod<[], [bigint], "view">;
  getFunction(nameOrSignature: "acceptTransfer"): TypedContractMethod<[_sender: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "batchCompoundForAccounts"
  ): TypedContractMethod<[_accounts: AddressLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "batchRestakeForAccounts"
  ): TypedContractMethod<[_accounts: AddressLike[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "batchStakeGmxForAccounts"
  ): TypedContractMethod<[_accounts: AddressLike[], _amounts: BigNumberish[]], [void], "nonpayable">;
  getFunction(nameOrSignature: "bnGmx"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "bonusGmxTracker"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "claim"): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(nameOrSignature: "claimEsGmx"): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(nameOrSignature: "claimFees"): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(nameOrSignature: "compound"): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(nameOrSignature: "esGmx"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "extendedGmxTracker"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "externalHandler"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "feeGlpTracker"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "feeGmxTracker"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "glp"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "glpManager"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "glpVester"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "gmx"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "gmxVester"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "gov"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "govToken"): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "handleRewards"
  ): TypedContractMethod<
    [
      _shouldClaimGmx: boolean,
      _shouldStakeGmx: boolean,
      _shouldClaimEsGmx: boolean,
      _shouldStakeEsGmx: boolean,
      _shouldStakeMultiplierPoints: boolean,
      _shouldClaimWeth: boolean,
      _shouldConvertWethToEth: boolean,
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "handleRewardsV2"
  ): TypedContractMethod<
    [
      _gmxReceiver: AddressLike,
      _shouldClaimGmx: boolean,
      _shouldStakeGmx: boolean,
      _shouldClaimEsGmx: boolean,
      _shouldStakeEsGmx: boolean,
      _shouldStakeMultiplierPoints: boolean,
      _shouldClaimWeth: boolean,
      _shouldConvertWethToEth: boolean,
    ],
    [void],
    "nonpayable"
  >;
  getFunction(nameOrSignature: "inRestakingMode"): TypedContractMethod<[], [boolean], "view">;
  getFunction(nameOrSignature: "inStrictTransferMode"): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<[_initializeParams: RewardRouterV2.InitializeParamsStruct], [void], "nonpayable">;
  getFunction(nameOrSignature: "isInitialized"): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "makeExternalCalls"
  ): TypedContractMethod<
    [
      externalCallTargets: AddressLike[],
      externalCallDataList: BytesLike[],
      refundTokens: AddressLike[],
      refundReceivers: AddressLike[],
    ],
    [void],
    "nonpayable"
  >;
  getFunction(nameOrSignature: "maxBoostBasisPoints"): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "mintAndStakeGlp"
  ): TypedContractMethod<
    [_token: AddressLike, _amount: BigNumberish, _minUsdg: BigNumberish, _minGlp: BigNumberish],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "mintAndStakeGlpETH"
  ): TypedContractMethod<[_minUsdg: BigNumberish, _minGlp: BigNumberish], [bigint], "payable">;
  getFunction(nameOrSignature: "multicall"): TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
  getFunction(nameOrSignature: "pendingReceivers"): TypedContractMethod<[arg0: AddressLike], [string], "view">;
  getFunction(nameOrSignature: "setGov"): TypedContractMethod<[_gov: AddressLike], [void], "nonpayable">;
  getFunction(nameOrSignature: "setGovToken"): TypedContractMethod<[_govToken: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setInRestakingMode"
  ): TypedContractMethod<[_inRestakingMode: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setInStrictTransferMode"
  ): TypedContractMethod<[_inStrictTransferMode: boolean], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setMaxBoostBasisPoints"
  ): TypedContractMethod<[_maxBoostBasisPoints: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setVotingPowerType"
  ): TypedContractMethod<[_votingPowerType: BigNumberish], [void], "nonpayable">;
  getFunction(nameOrSignature: "signalTransfer"): TypedContractMethod<[_receiver: AddressLike], [void], "nonpayable">;
  getFunction(nameOrSignature: "stakeEsGmx"): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;
  getFunction(nameOrSignature: "stakeGmx"): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;
  getFunction(nameOrSignature: "stakedGlpTracker"): TypedContractMethod<[], [string], "view">;
  getFunction(nameOrSignature: "stakedGmxTracker"): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "unstakeAndRedeemGlp"
  ): TypedContractMethod<
    [_tokenOut: AddressLike, _glpAmount: BigNumberish, _minOut: BigNumberish, _receiver: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "unstakeAndRedeemGlpETH"
  ): TypedContractMethod<
    [_glpAmount: BigNumberish, _minOut: BigNumberish, _receiver: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(nameOrSignature: "unstakeEsGmx"): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;
  getFunction(nameOrSignature: "unstakeGmx"): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;
  getFunction(nameOrSignature: "votingPowerType"): TypedContractMethod<[], [bigint], "view">;
  getFunction(nameOrSignature: "weth"): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdrawToken"
  ): TypedContractMethod<[_token: AddressLike, _account: AddressLike, _amount: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "StakeGlp"
  ): TypedContractEvent<StakeGlpEvent.InputTuple, StakeGlpEvent.OutputTuple, StakeGlpEvent.OutputObject>;
  getEvent(
    key: "StakeGmx"
  ): TypedContractEvent<StakeGmxEvent.InputTuple, StakeGmxEvent.OutputTuple, StakeGmxEvent.OutputObject>;
  getEvent(
    key: "UnstakeGlp"
  ): TypedContractEvent<UnstakeGlpEvent.InputTuple, UnstakeGlpEvent.OutputTuple, UnstakeGlpEvent.OutputObject>;
  getEvent(
    key: "UnstakeGmx"
  ): TypedContractEvent<UnstakeGmxEvent.InputTuple, UnstakeGmxEvent.OutputTuple, UnstakeGmxEvent.OutputObject>;

  filters: {
    "StakeGlp(address,uint256)": TypedContractEvent<
      StakeGlpEvent.InputTuple,
      StakeGlpEvent.OutputTuple,
      StakeGlpEvent.OutputObject
    >;
    StakeGlp: TypedContractEvent<StakeGlpEvent.InputTuple, StakeGlpEvent.OutputTuple, StakeGlpEvent.OutputObject>;

    "StakeGmx(address,address,uint256)": TypedContractEvent<
      StakeGmxEvent.InputTuple,
      StakeGmxEvent.OutputTuple,
      StakeGmxEvent.OutputObject
    >;
    StakeGmx: TypedContractEvent<StakeGmxEvent.InputTuple, StakeGmxEvent.OutputTuple, StakeGmxEvent.OutputObject>;

    "UnstakeGlp(address,uint256)": TypedContractEvent<
      UnstakeGlpEvent.InputTuple,
      UnstakeGlpEvent.OutputTuple,
      UnstakeGlpEvent.OutputObject
    >;
    UnstakeGlp: TypedContractEvent<
      UnstakeGlpEvent.InputTuple,
      UnstakeGlpEvent.OutputTuple,
      UnstakeGlpEvent.OutputObject
    >;

    "UnstakeGmx(address,address,uint256)": TypedContractEvent<
      UnstakeGmxEvent.InputTuple,
      UnstakeGmxEvent.OutputTuple,
      UnstakeGmxEvent.OutputObject
    >;
    UnstakeGmx: TypedContractEvent<
      UnstakeGmxEvent.InputTuple,
      UnstakeGmxEvent.OutputTuple,
      UnstakeGmxEvent.OutputObject
    >;
  };
}